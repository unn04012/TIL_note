import { Model, HydratedDocument } from 'mongoose';

const findAllandDelete = async <T>(model: Model<T>): Promise<HydratedDocument<T>[] | void> => {
  try {
    const result = await model.find();
    if (result) await model.deleteMany();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export { findAllandDelete };
