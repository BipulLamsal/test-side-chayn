const ControlCard = ({ title, icon: Icon, isActive, onClick, children }) => (
    <div className="relative">
        <button
            onClick={onClick}
            className={`glassy-button flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/20 border-white/30' : 'bg-white/10 border-white/20'
                }`}
            style={{
                background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`,
                backdropFilter: 'blur(10px)',
                color: 'rgba(255, 255, 255, 0.8)'
            }}
        >
            <Icon size={16} />
            <span className="text-sm">{title}</span>
        </button>
        {isActive && children && (
            <div className="absolute top-full mt-2 right-0 z-10 p-4 rounded-lg"
                style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(20px)',
                    minWidth: '200px'
                }}>
                {children}
            </div>
        )}
    </div>
);

export default ControlCard;