import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id:1,
                title: "Spanish",
                imageSrc: "/es.svg",
            },
            {
                id:2,
                title: "English",
                imageSrc: "/us.svg",
            },
            {
                id:3,
                title: "French",
                imageSrc: "/fr.svg",
            },
            {
                id:4,
                title: "Italian",
                imageSrc: "/it.svg",
            },
            {
                id:5,
                title: "Mandarin",
                imageSrc: "/CN.svg",
            },
            {
                id:6,
                title: "Cantonese",
                imageSrc: "/TW.svg",
            },
            {
                id:7,
                title: "Japanese",
                imageSrc: "/jp.svg",
            },
            {
                id:8,
                title: "Croatian",
                imageSrc: "/hr.svg",
            },
            {
                id:9,
                title: "Russian",
                imageSrc: "/ru.svg",
            },
            {
                id:10,
                title: "Korean",
                imageSrc: "/kr.svg",
            },
            {
                id:11,
                title: "German",
                imageSrc: "/de.svg",
            },
            {
                id:12,
                title: "Portugese",
                imageSrc: "/br.svg",
            },
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1, // Spanish
                title: "Unit 1",
                description: "Learn the basics of Spanish",
                order: 1,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 1,
                title: "Nouns",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, //Nouns
                type: "SELECT",
                order: 1,
                question: 'Which one of these is the "the man"?',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id:1,
                challengeId: 1,
                imageSrc: "/man.svg",
                correct: true,
                text: "el hombre",
                audioSrc: "/es_man.mp3",
            },
            {
                id:2,
                challengeId: 1,
                imageSrc: "/woman.svg",
                correct: false,
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
            },
            {
                id:3,
                challengeId: 1,
                imageSrc: "/robot.svg",
                correct: false,
                text: "el robot",
                audioSrc: "/es_robot.mp3",
            },
        ]); 


        console.log("Seeding finished.");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();