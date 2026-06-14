function getUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = [
                { id: 1, name: "Charan" },
                { id: 2, name: "Nikitha" }
            ];
            const user = users.find(u => u.id === userId);

            if (user) {
                resolve(user);
            } else {
                reject("User not found");
            }
        }, 1000);
    });
}
function getOrders(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orders = {
                1: ["Laptop", "Mouse", "Keyboard"],
                2: ["Mobile", "Earphones"]
            };
            if (orders[userId]) {
                resolve(orders[userId]);
            } else {
                reject("No orders found");
            }
        }, 1500);
    });
}
async function displayUserOrders() {
    try {
        const user = await getUser(1);
        console.log("User:", user.name);

        const orders = await getOrders(user.id);
        console.log("Orders:", orders);
    } catch (error) {
        console.log("Error:", error);
    }
}
displayUserOrders();