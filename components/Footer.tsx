export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border-2 border-[#C9A962] flex items-center justify-center">
                <span className="text-[#C9A962] font-serif text-lg tracking-[-1px]">A</span>
              </div>
              <span className="font-semibold tracking-[1.5px]">ALGHAZALI WATCHES</span>
            </div>
            <p className="text-xs text-white/50 mt-1">Geneva • Since 2018</p>
          </div>

          <div className="text-white/60 text-center md:text-right">
            © {new Date().getFullYear()} Alghazali Watches. All Rights Reserved.<br />
            Handcrafted with precision.
          </div>
        </div>
      </div>
    </footer>
  );
}
