declare namespace NodeJS {
  interface ProcessEnv {
    WHATSAPP_LOCAL_MOCK?: string
    WEBHOOK_PORT?: string
    WEBHOOK_VERIFY_TOKEN?: string
    WHATSAPP_PHONE_NUMBER_ID?: string
    WHATSAPP_ACCESS_TOKEN?: string
    GRAPH_API_VERSION?: string
    RAZORPAY_KEY_ID?: string
    RAZORPAY_KEY_SECRET?: string
    GEMINI_API_KEY?: string
    WA_SESSION?: string
    QR_PORT?: string
    CHROME_PATH?: string
    WA_HEADLESS?: string
  }
}
