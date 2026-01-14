import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "@emailjs/browser";


export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submmiting: false,
    success: false,
    error: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      service: import.meta.env.VITE_SERVICE_ID,
      template: import.meta.env.VITE_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_PUBLIC_KEY,
    });    

    setFormStatus({ submmiting: true, success: false, error: false, message: "" });

    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        },
      );

       setFormStatus({ submmiting: false, success: true, error: false, message: "Message sent successfully!" });
       setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setFormStatus({ submmiting: false, success: false, error: true, message: "Failed to send message. Please try again." });
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="px-4 w-full min-w-[300px] md:w-[500px] sm:w-2/3 p-6">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            {" "}
            Get In Touch
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="Name..."
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="example@gmail.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="Your Message..."
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={formStatus.submmiting}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              {formStatus.submmiting ? "Sending..." : "Send Message"}
            </button>

            {formStatus.message && (
              <div
                className={`mt-4 text-center ${formStatus.success ? "text-green-500" : "text-red-500"}`}
              >
                {formStatus.message}
              </div>
            )}
          </form>
        </div>
      </RevealOnScroll>
    </section>
  );
};
