import { noteList, updateNote } from './note';
import { Request, Response } from 'express';
import Note from '../schemas/note';
jest.mock('../schemas/note');

const mockResponse = (): Response => {
  const res = {
    json: jest.fn(() => res),
  } as unknown;
  return res as Response;
};
const next = jest.fn();
const mockNote = Note as jest.MockedClass<typeof Note>;

describe('note api test', () => {
  const mockRequest = (): Request => {
    const req = {} as unknown;
    return req as Request;
  };
  const res = mockResponse();
  const req = mockRequest();

  test('note list api', async () => {
    mockNote.mockReturnValue({
      noteList() {
        return Promise.resolve(true);
      },
    });
    await noteList(req, res, next);
    expect(res.json);
  });

  test('note list failed api', async () => {
    mockNote.mockReturnValue(null);
    await noteList(req, res, next);
    expect(res.json).toBeCalledWith({ status: 404, message: 'no note list' });
  });
});

describe('update note api', () => {
  const mockRequest = (): Request => {
    const req = {
      body: {
        id: 1,
        content: 'test content',
      },
    } as unknown;
    return req as Request;
  };
  const req = mockRequest();
  const res = mockResponse();
  test('success update note ', async () => {
    await updateNote(req, res, next);
    expect(res.json).toBeCalledWith({ message: 'update success', stateCode: 200 });
  });

  test('failed update note', async () => {
    mockNote.mockRejectedValue(null);
    await updateNote(req, res, next);
    expect(res.json).toBeCalledWith({ message: 'update fail', stateCode: 404 });
  });
});
