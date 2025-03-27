import express from "express";
import usersRouter from './routers/usersRouter.js';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json());
app.use(usersRouter);

const swaggerDefinition = {
    definition: {
        openapi:'3.1.0',
        info: {
            title: 'Users API',
            version: '0.0.1'
        }
    },
    apis: ['./routers/*.js']
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./routers/*.js']
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));

const PORT = 8080;
app.listen(PORT, () => console.log(`${PORT}`));