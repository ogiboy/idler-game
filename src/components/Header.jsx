const Header = ({ formattedMoney, handleReset }) => {
  return (
    <div className="p-5 w-full h-full flex flex-col items-center justify-between">
      <h1 className="text-blue-900 text-nowrap text-3xl md:text-4xl lg:text-5xl">
        {formattedMoney}
      </h1>
      <button
        onClick={() => handleReset()}
        className="bg-gradient-to-tr hover:bg-gradient-to-bl from-red-500 to-yellow-500 rounded-sm px-2 mt-3 hover:ring-1 text-amber-200 hover:text-amber-800 scale-75"
      >
        Reset Progress
      </button>
    </div>
  )
}
export default Header
