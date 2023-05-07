const Joi = require("joi");
const fs = require("fs");
const Blog = require("../models/blog");
const { BASE_URL } = require("../config");
const BlogDTO = require("../DTOs/Blog");
const BlogDetailsDTO = require("../DTOs/blog-details");
const comment = require("../models/comment");
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const BlogController = {
    async Create(req, res, next) {
        // 1. validate req body
        // 2. handle photo storage, naming
        // 3. add to db
        // 4. return response

        // client side -> base64 encoded string -> decode -> store -> save photo's path in db

        const createBlogSchema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            content: Joi.string().required(),
            photo: Joi.string().required()
        });


        const { error } = createBlogSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { title, author, content, photo } = req.body;

        // read as buffer
        const buffer = Buffer.from(
            photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
            "base64"
        );

        // allot a random name
        const imagePath = `${Date.now()}-${author}.png`;
        let response;

        try {

            fs.writeFileSync(`storeage/${imagePath}`, buffer);
        } catch (error) {

            return next(error);
        }

        //save blog
        let newBlog;
        try {
            newBlog = new Blog({
                title: title,
                content: content,
                photoPath: `${BASE_URL}/storeage/${imagePath}`,
                author: author
            });

            await newBlog.save();
        } catch (error) {
            return next(error);
        }

        const blogDto = new BlogDTO(newBlog);

        return res.status(201).json({ blog: blogDto });
    },

    async GetAllBlogs(req, res, next) {
        try {
            const blogs = await Blog.find({});

            const blogDto = [];
            for (let index = 0; index < blogs.length; index++) {
                const dto = new BlogDTO(blogs[index]);
                blogDto.push(dto);
            }

            return res.status(200).json({ blogs: blogDto });
        } catch (error) {
            return next(error);
        }
    },
    async GetById(req, res, next) {
        const getIdScheme = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        });

        const { error } = getIdScheme.validate(req.id);
        if (error) {
            return next(error);
        }
        let blog;
        const { id } = req.params;

        try {
            blog = await Blog.findOne({ _id: id }).populate("author");
        } catch (error) {
            return next(error);
        }

        const blogDto = new BlogDetailsDTO(blog);
        return res.status(200).json({ blog: blogDto });
    },
    async updateBlog(req, res, next) {

        const updateBlogSchema = Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            blogId: Joi.string().regex(mongodbIdPattern).required(),
            photo: Joi.string(),
        });

        const { error } = updateBlogSchema.validate(req.body);

        const { title, content, author, blogId, photo } = req.body;

        let blog;
        try {
            blog = await Blog.findOne({ _id: blogId });

        } catch (error) {
            return next(error);
        }
        if (photo) {
            let previousPhoto = blog.photoPath;
            previousPhoto = previousPhoto.split("/").at(-1);
            //Delete Photo
            // delete photo
            fs.unlinkSync(`storage/${previousPhoto}`);

            //    read as buffer
            const buffer = Buffer.from(
                photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
                "base64"
            );

            //   allot a random name
            const imagePath = `${Date.now()}-${author}.png`;


            // save locally
            let response;
            try {
                // response = await cloudinary.uploader.upload(photo);
                fs.writeFileSync(`storage/${imagePath}`, buffer);
            } catch (error) {
                return next(error);
            }

            await Blog.updateOne({ _id: id }, { title, content, photoPath: `${BASE_URL}/storeage/${imagePath}` });
        } else {
            await Blog.updateOne({ _id: blogId }, { title, content });
        }
        return res.status(200).json({ message: "blog updated!" });
    },
    async DeleteBlog(req, res, next) {
        // validate id
        // delete blog
        // delete comments on this blog

        const deleteBlogSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required(),
        });

        const { error } = deleteBlogSchema.validate(req.params);

        const { id } = req.params;

        // delete blog
        // delete comments
        try {
            await Blog.deleteOne({ _id: id });

            await comment.deleteMany({ blog: id });
        } catch (error) {
            return next(error);
        }

        return res.status(200).json({ message: "blog deleted" });
    },
}

module.exports = BlogController;