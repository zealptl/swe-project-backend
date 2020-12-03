declare namespace Express {
  interface Request {
    currentUser: {
      id: string;
      role: string;
    };
    file: {
      fieldname: string;
      filename: string;
      path: string;
      mimetype: string;
    };
  }
}
