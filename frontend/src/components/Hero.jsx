function  Banner(){
  return( 
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to e-Haat</h1>
            <p className="py-6">
              Your one-stop destination for all your shopping needs. Explore a wide range of products and enjoy a seamless shopping experience.
            </p>
            <a href="/products" className="btn btn-primary">Shop Now</a>
          </div>
        </div>
      </div>

      <div className="bg-base-100 p-6">
        <h2 className="text-3xl font-bold text-center mb-4">
          Featured Products
        </h2>
</div>
</>
  );
        }
export default Banner;