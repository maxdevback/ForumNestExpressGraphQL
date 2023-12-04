import { PostModel } from "./posts.model";

class PostsRepositoryClass {
  notFoundThrow = {
    httpCode: 404,
    message: "This post doesn't exist",
  };
  async create(title: string, body: string, authorId: string) {
    const newPost = new PostModel({ title, body, authorId });
    return await newPost.save();
  }
  async changeCommentsStatus(newStatus: boolean, postId: string) {
    const post = await PostModel.findById(postId);
    if (!post) throw this.notFoundThrow;
    post.hasComments = newStatus;
    await post.save();
    return post;
  }
  async getByPage(page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await PostModel.find().skip(skip).limit(pageSize);
  }
  async getByAuthorAndPage(authorId: string, page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await PostModel.find({ authorId }).skip(skip).limit(pageSize);
  }
  async getByPostId(postId: string) {
    const post = await PostModel.findById(postId);
    if (!post) throw this.notFoundThrow;
    return post;
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
    console.log(updateInfo);
    if (updateInfo.matchedCount < 1) throw this.notFoundThrow;
    return updateInfo;
  }
  async increaseRoughNumberOfLikes(postId: string) {
    const post = await this.getByPostId(postId);
    post.roughNumberOfLikes++;
    return await post.save();
  }
}

export const PostsRepository = new PostsRepositoryClass();
