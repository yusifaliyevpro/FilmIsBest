export default function Footer() {
  return (
    <footer
      className={`fixed bottom-0 left-0 z-50 flex h-12 w-full items-center justify-center bg-gray-200`}
    >
      <h3 className="select-none text-xl font-bold no-underline">
        👌 Made by{" "}
        <a
          className="text-xl no-underline hover:text-blue-600"
          href="https://yusifaliyevpro.com"
          target="_blank"
        >
          YusifAliyevPro
        </a>
      </h3>
    </footer>
  );
}
