import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import type { AppProps } from "next/app";
import "@/styles/main.scss";
import { Roboto } from "next/font/google";
import { LoginModalProvider } from "@/contexts/LoginModalContext";
import LoginModal from "@/components/LoginModal";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LoginModalProvider>
        <div className={`${roboto.className} appWrapper`}>
        <LoginModal />
          <Header />
          <div className="pageContent">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </LoginModalProvider>
    </AuthProvider>
  );
}
