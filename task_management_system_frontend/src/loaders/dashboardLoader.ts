import api from "../api/axios";

export async function dashboardLoader() {
    try {
      // fetch users & tasks in parallel
      const [users, tasks] = await Promise.all([
        api.get("/users"),   // thanks to interceptor → returns only data[]
        api.get("/tasks")
      ]);
  
      return { users, tasks };
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      throw err;
    }
  }