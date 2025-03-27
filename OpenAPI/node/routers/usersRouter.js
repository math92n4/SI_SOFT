import { Router } from "express";

const router = Router();
const newId = 4;

const users = [
    { id: 1, name: "Arne"},
    { id: 2, name: "Minho"},
    { id: 3, name: "Charlie"}
];

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:	
 *         description: Returns all users
 */
router.get('/api/users', (req, res) => {
    res.send({ data: users });
});

/**
 * @openapi
 * /api/users:
 *   post:
 *     description: Create a new user
 *     responses:
 *       200:	
 *         description: Returns the created user
 */
router.post('/api/users', (req, res) => {
    const user = req.body;
    user.id = newId++;
    users.push(user);

    res.send({ data: user });
});

export default router;