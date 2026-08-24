interface PaymentSheetProps {
  amount: number
  onPay: () => void
  onClose: () => void
}

export default function PaymentSheet({ amount, onPay, onClose }: PaymentSheetProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl">
        <div className="bg-[#5F259F] text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Razorpay</span>
            <button onClick={onClose} className="text-white/80 hover:text-white text-xl leading-none">
              &times;
            </button>
          </div>
        </div>

        <div className="px-6 py-8 text-center">
          <p className="text-gray-500 text-sm mb-2">Amount to pay</p>
          <p className="text-4xl font-bold text-gray-900 mb-1">
            <span className="text-lg">₹</span>{amount}
          </p>
          <p className="text-gray-400 text-xs mb-6">Snabbit Home Services</p>

          <div className="flex items-center gap-2 justify-center mb-6 text-sm text-gray-500">
            <span className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white text-[10px]">
              &#10003;
            </span>
            Secured by Razorpay
          </div>

          <button
            onClick={onPay}
            className="w-full bg-[#5F259F] hover:bg-[#4a1d7a] text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Pay ₹{amount}
          </button>
        </div>

        <div className="px-6 py-3 border-t border-gray-100 text-center text-[11px] text-gray-400">
          Demo only — no real payment processed
        </div>
      </div>
    </div>
  )
}
