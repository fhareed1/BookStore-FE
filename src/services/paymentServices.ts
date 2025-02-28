import apiClient from "@/config/axiosInstance";

const initialPayment = async (payload: { email: string; amount: string }) => {
  try {
    const response = await apiClient.post(`/transaction/initialize`, payload);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const paymentService = {
  initialPayment,
};

export default paymentService;
