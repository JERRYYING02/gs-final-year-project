const { PrismaClient } = require("@prisma/client");
//seeding the categories of courses manually into database 
const database = new PrismaClient();
async function seedingCategory() {
    try {
        await database.category.createMany({
            data: 
            [
                { name: "Computer Science"},
                { name: "Curating" },
                { name: "Media & Comms" },
                { name: "Jounalism" },
                { name: "Marketing" },
                { name: "Music" },
                { name: "Theater Performance" },
            ],
        });
        console.log("successfully created");
    } catch (error) {
        console.log("error creating categories", error);
    }
}
seedingCategory();