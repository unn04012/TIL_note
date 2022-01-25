const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Meditator's Node Express API with Swagger",
      version: '0.1.0',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Meditator',
        url: 'https://velog.io/@yongh8445',
        email: 'yonghoon95@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/books',
      },
    ],
  },
  apis: ['./routes/books.js'],
};
export default options;
