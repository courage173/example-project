import { Request, Response } from "express";

export const isUserOwnerGuard = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const user = req.user;
    const blogService = new BlogService();
    const blog = await blogService.get(req.params.id);
    if (blog.author !== user._id) {
      return res.status(401).json({ message: "Access Denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
