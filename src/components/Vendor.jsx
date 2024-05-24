const Vendor = ({ building, handlePurchase }) => {
  return (
    <div>
      <button
        onClick={() => handlePurchase(building.id)}
        className="border rounded-md bg-slate-300 text-slate-700 py-1 px-2"
      >
        Buy {building.name} - Cost {building.cost}
      </button>
      <p>
        {building.name}: {building.number}
      </p>
      <p>
        Earn {building.income} dollars every {building.duration / 1000} second
        {building.duration > 1000 ? 's' : ''} for each {building.name} you own
      </p>
    </div>
  )
}
export default Vendor
