export default function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-brand px-6 py-10 text-center text-white sm:px-12">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          Never Miss a Deal
        </h2>
        <p className="max-w-xl text-white/90">
          Sign up for the A&amp;A newsletter and be the first to see weekly ads,
          recipes, and exclusive coupons.
        </p>
        <form
          action="#"
          className="flex w-full max-w-md items-stretch overflow-hidden rounded-full bg-white"
        >
          <input
            type="email"
            required
            placeholder="Enter your email address"
            aria-label="Email address"
            className="w-full px-4 text-sm text-stone-900 outline-none"
          />
          <button
            type="submit"
            className="bg-gold px-6 text-sm font-bold text-stone-900 hover:brightness-95"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
