import { Types } from "mongoose";
import { PostsExceptions } from "./posts.exceptions";
import { IPost, PostModel } from "./posts.model";

class PostsRepositoryClass {
  async create(title: string, body: string, authorId: string) {
    const newPost = new PostModel({ title, body, authorId });
    return await newPost.save();
  }
  async changeCommentsStatus(newStatus: boolean, post: IPost) {
    post.hasComments = newStatus;
    await post.save();
    return post;
  }
  /**
   * @deprecated since version 2.0.0
   */
  async getByPageOldOld(page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await PostModel.find().skip(skip).limit(pageSize);
  }
  async getByPage(page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;

    return await PostModel.aggregate([{ $skip: skip }, { $limit: pageSize }]);
  }
  /**
   * @deprecated since version 2.0.0
   */
  async getByAuthorAndPageOld(authorId: string, page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await PostModel.find({ authorId }).skip(skip).limit(pageSize);
  }
  async getByAuthorAndPage(authorId: string, page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;

    return await PostModel.aggregate([
      { $match: { authorId: authorId } },
      { $skip: skip },
      { $limit: pageSize },
    ]);
  }
  /**
   * @deprecated since version 2.0.0
   */
  async getByPostIdOld(postId: string) {
    return await PostModel.findOne({ _id: postId });
  }
  async getByPostId(postId: string) {
    const post = await PostModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(postId),
        },
      },
    ]);
    return post[0];
  }
  async updateByPostIdAndAuthorId(
    postId: string,
    authorId: string,
    newData: object
  ) {
    const updateInfo = await PostModel.updateOne(
      { _id: postId, authorId },
      newData
    );
    if (updateInfo.matchedCount < 1) throw PostsExceptions.notFound;
    return updateInfo;
  }
  async increaseRoughNumberOfLikes(postId: string) {
    const post = await this.getByPostId(postId);
    post.roughNumberOfLikes++;
    return await post.save();
  }
}

export const PostsRepository = new PostsRepositoryClass();
