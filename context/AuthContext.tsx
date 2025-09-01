// "use client"
// import { createContext, useContext, useState, useEffect } from "react";
// import { getCurrentUser } from "@/utils/api";

// const AuthContext = createContext<any>(null);

// type User = {
//   email: string;
//   first_name: string;
//   last_name: string;
//   department_id: number;
//   user_id: number;
//   join_date: string;
//   role: string;
// };

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     getCurrentUser().then(setUser).catch(() => setUser(null));
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
