import React from 'react'

export const WhyShopnest = () => {
  return (
   <div className="w-full bg-white border-y border-gray-100 py-8">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {/* Free Shipping */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F0EDFF]">
          <img
            src="https://cdn-icons-png.flaticon.com/128/6831/6831000.png"
            alt="Free shipping"
            className="w-8 h-8 object-contain"
          />
        </div>

        <div>
          <p className="text-base font-semibold text-gray-900">
            Free Shipping
          </p>
          <p className="text-sm text-gray-500 mt-1">
            On orders above ₹999
          </p>
        </div>
      </div>

      {/* Secure Payment */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F0EDFF]">
          <img
            src="https://cdn-icons-png.flaticon.com/128/747/747305.png"
            alt="Secure payment"
            className="w-8 h-8 object-contain"
          />
        </div>

        <div>
          <p className="text-base font-semibold text-gray-900">
            Secure Payment
          </p>
          <p className="text-sm text-gray-500 mt-1">
            100% secure checkout
          </p>
        </div>
      </div>

      {/* Easy Returns */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F0EDFF]">
          <img
            src="https://cdn-icons-png.flaticon.com/128/860/860828.png"
            alt="Easy returns"
            className="w-8 h-8 object-contain"
          />
        </div>

        <div>
          <p className="text-base font-semibold text-gray-900">
            Easy Returns
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Hassle-free returns
          </p>
        </div>
      </div>

      {/* Customer Support */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F0EDFF]">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3059/3059518.png"
            alt="Customer support"
            className="w-8 h-8 object-contain"
          />
        </div>

        <div>
          <p className="text-base font-semibold text-gray-900">
            24/7 Support
          </p>
          <p className="text-sm text-gray-500 mt-1">
            We're here to help
          </p>
        </div>
      </div>

    </div>
  </div>
</div>
  )
}
