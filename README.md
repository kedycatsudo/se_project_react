# React + Vite

I worked on my code last night and everything was working. Then i pushed it to github. Today when i open it back to work on form validation, it didn`t load first then i got error with API. Then i added that code so i can throw error and retry connect to API.

here is the code that i added on weatherApi.js

export const getWeather = async (
{ latitude, longitude },
APIkey,
retries = 3
) => {
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;

for (let attempt = 1; attempt <= retries; attempt++) {
try {
const response = await fetch(url);
if (!response.ok) throw new Error(`Error: ${response.status}`);
return await response.json();
} catch (err) {
console.warn(`Attempt ${attempt} failed: ${err.message}`);
if (attempt === retries) throw err;
await new Promise((resolve) => setTimeout(resolve, 1000 \* attempt)); // exponential backoff
}
}
};

then i was able to retry to connect to API. But then i realized that it takes sometimes few seconds to load the page. Rarerly 3 times fails and connection not happens.

But sometimes it loads for first time connection. Be honest i tried and checked but i couldn`t find the problem.

However, i did the validation but i don`t think if i will make the mobile design.

Thank you.
