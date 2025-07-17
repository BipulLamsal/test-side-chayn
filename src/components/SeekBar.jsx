const Seekbar = ({ value, onChange, min = 0, max = 1, step = 0.1, label }) => (
    <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-white/60">
            <span>{label}</span>
            <span>{typeof value === 'number' ? value.toFixed(1) : value}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#422F51] outline-0"
        />
    </div>
);

export default Seekbar;