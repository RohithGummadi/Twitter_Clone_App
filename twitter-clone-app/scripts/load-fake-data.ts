import {faker} from "@faker-js/faker";
import bcrypt from "bcrypt";
import { getClient } from "@/db";


async function loadFakeData(numUsers = 10) {
    console.log(`Executing load fake data. Generating ${numUsers} users`);

    const client = await getClient();
    await client.connect();
    try {
        await client.query("begin")

        for (let i = 0; i < numUsers; i++){
            const saltRounds = 10;
            const hash = await bcrypt.hash("strings123", saltRounds);
            await client.query("insert into users (username, password, avatar) values($1, $2, $3)", [faker.internet.userName(), hash, faker.image.avatar()])
        }

        const res = await client.query("select id from users order by created_at desc limit $1", [numUsers])
        console.log(res.rows);

        for (const row of res.rows){
            for(let i=0; i<Math.ceil(Math.random()*10); i++){
                await client.query(
                    "insert into posts (user_id, content) values ($1, $2)", [row.id, faker.lorem.sentence()]
                )

            }
        }

        for(const row1 of res.rows){
            for (const row2 of res.rows){
                if (row1.id!==row2.id){
                    if (Math.random()>0.5){
                        await client.query("insert into follows (user_id , follower_id) values ($1, $2)", [row1.id, row2.id]);
                    }
                }
            }
        }
        
        await client.query("commit")

    } catch (error) {
        await client.query("rollback")
        throw error
    }
    await client.end()
}

const numUsers = parseInt(process.argv[2]) || 10;
console.log(`loading ${numUsers} fakeusers`);
loadFakeData(numUsers);


