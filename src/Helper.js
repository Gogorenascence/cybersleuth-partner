const helper = {
    todaysFormattedDate: async function todaysFormattedDate() {
        const timeZone = 'America/Chicago';
        const options = { timeZone: timeZone, year: 'numeric', month: '2-digit', day: '2-digit' };
        const adjustedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
        const formattedDate = new Date(adjustedDate).toISOString().split('T')[0];
        return formattedDate;
    },
    createTimeObj: async function createTimeObj() {
        let now = new Date();
        now.setHours(now.getHours() + 5)

        let year = now.getFullYear();
        let month = String(now.getMonth() + 1).padStart(2, '0');
        let day = String(now.getDate()).padStart(2, '0');
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');

        // Construct time_dict
        let time_dict = {
            "year": year,
            "month": month,
            "day": day,
            "time": hours + ":" + minutes,
            "full_time": now.toISOString()
        };

        console.log(time_dict);
        return time_dict
    },
    generateRandomString: async function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
        }
        return randomString;
    },
}

export default helper
