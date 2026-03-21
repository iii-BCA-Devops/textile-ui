const API_BASE_URL = "https://product-management-g6dkdcg7b8hygtay.southeastasia-01.azurewebsites.net/api";

export const getProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
};

export const addProduct = async (product) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    return response.json();
};