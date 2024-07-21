const axios = require('axios');
const { faker } = require('@faker-js/faker');

// URL de votre API
const API_URL = 'http://localhost:4555/conference'; // Remplacez par l'URL de votre API
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhZG1pbiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTcyMTM4MTA5NywiZXhwIjoxNzIyMjQ1MDk3fQ.jhQmnevx5K1rhQ9E7Ys7LV_XGvqXRvhHs9_0pa18U9Y';


const generateRandomConference = () => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    date: faker.date.future().toISOString(),
    createdAt: new Date().toISOString(),
    description: faker.lorem.paragraph(),
    img: faker.image.imageUrl(),
    content: faker.lorem.paragraphs(3),
    duration: `${faker.number.int(10)} hours`,
    osMap: {
        addressl1: faker.location.streetAddress(),
        addressl2: faker.location.secondaryAddress(),
        postalCode: faker.location.zipCode(),
        city: faker.location.city(),
        coordinates: [faker.location.longitude(), faker.location.latitude()],
    },
    speakers: [
        {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
        }
    ],
    stakeholders: [
        {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            job: faker.person.jobTitle(),
            img: faker.image.avatar(),
        }
    ],
    design: {
        mainColor: faker.internet.color(),
        secondColor: faker.internet.color(),
    }
});

const seedDatabase = async () => {
    try {
        const numConferences = 1;
        const conferences = Array.from({ length: numConferences }, generateRandomConference);

        for (const conference of conferences) {
            try {
                console.log(conference);
                const response = await axios.post(API_URL, conference, {
                    headers: {
                        Authorization: `Bearer ${BEARER_TOKEN}`,
                        'Content-Type': 'application/json',
                    }
                });
                console.log('Conference created:', response.data);
            } catch (innerError) {
                console.error('Error creating conference:', conference.title, innerError.response?.data || innerError.message);
            }
        }

        console.log(`${numConferences} conferences created successfully`);
    } catch (error) {
        console.error('Error in seeding database:', error.response?.data || error.message);
    }
};

seedDatabase();
