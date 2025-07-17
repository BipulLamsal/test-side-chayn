import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Settings, Zap } from 'lucide-react';
import ControlCard from './ControlCard';
import Seekbar from './SeekBar';

const MusicPlayerCard = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [volume, setVolume] = useState(0.7);
    const [showSpeedControl, setShowSpeedControl] = useState(false);
    const [showPitchControl, setShowPitchControl] = useState(false);
    const [showEqualizer, setShowEqualizer] = useState(false);
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    const songData = {
        title: "Sano Prakash",
        artist: "Artist Name",
        image: "logo.jpg",
        duration: "03:45",
        url: "song.mp3"
    };


    // Initialize audio element
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = speed;
            audioRef.current.volume = volume;
        }
    }, [speed, volume]);

    // Update current time
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleProgressClick = (e) => {
        if (audioRef.current && progressRef.current) {
            const rect = progressRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const newTime = percentage * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };





    return (
        <div className="flex justify-center items-center min-h-screen">

            <audio
                ref={audioRef}
                src={songData.url}
                onEnded={() => setIsPlaying(false)}
            />

            {/* card backgorund with backdrop blur effect */}
            <div
                className="relative bg-gradient-to-br from-purple-900/20 via-pink-800/20 to-purple-900/20 backdrop-blur-5xl rounded-[30px] p-8"
                style={{
                    width: '760px',
                    background: 'radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(87, 25, 199, 0.2) 0%, rgba(173, 56, 221, 0.2) 77.08%, rgba(47, 21, 134, 0.2) 100%)',
                    backdropFilter: 'blur(40px)',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                }}
            >
                {/* seperates buttons and the song information section in column  */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">

                        <div
                            className="w-35 h-35 mt-[-60px] rounded-full bg-gray-300 flex items-center justify-center overflow-hidden shadow-lg"
                        >
                            <img
                                src={songData.image}
                                alt="Album Art"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Eq Controls */}
                        <div className="flex flex-col gap-4">
                            <ControlCard
                                title="Equalizer"
                                icon={Settings}
                                isActive={showEqualizer}
                                onClick={() => {
                                    setShowEqualizer(!showEqualizer)
                                    setShowPitchControl(false);
                                    setShowSpeedControl(false);
                                }}
                            >
                                <div className="space-y-3">
                                    <Seekbar
                                        value={volume}
                                        onChange={(e) => { setVolume(parseFloat(e.target.value)) }}
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        label="Volume"
                                    />
                                    <Seekbar
                                        value={0.5}
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        label="Bass"
                                    />
                                </div>
                            </ControlCard>

                            <ControlCard
                                title="Speed"
                                icon={Zap}
                                isActive={showSpeedControl}
                                onClick={() => {
                                    setShowSpeedControl(!showSpeedControl);
                                    setShowPitchControl(false);
                                    setShowEqualizer(false);

                                }

                                }
                            >
                                <Seekbar
                                    value={speed}
                                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                                    min={0.5}
                                    max={2}
                                    step={0.1}
                                    label="Playback Speed"
                                />
                            </ControlCard>

                            <ControlCard
                                title="Pitch"
                                icon={Volume2}
                                isActive={showPitchControl}
                                onClick={() => {
                                    setShowPitchControl(!showPitchControl);
                                    setShowEqualizer(false);
                                    setShowSpeedControl(false);
                                }}
                            >
                                <Seekbar
                                    value={pitch}
                                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                                    min={0.5}
                                    max={2}
                                    step={0.1}
                                    label="Pitch Shift"
                                />
                            </ControlCard>
                        </div>
                    </div>

                    <div className="mt-[-60px] flex flex-col">
                        <p className="text-lg sm:text-xl leading-[130.31%] text-white/66 font-mono mb-1">
                            Now Playing
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[130.31%] text-white/66 font-sans font-normal">
                            {songData.title}
                        </h2>
                    </div>

                    {/* Player Controls */}
                    <div className="mt-6">
                        <div className="flex items-center gap-4 mb-4">
                            <button
                                onClick={togglePlay}
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white/66 hover:text-white transition-colors"
                                style={{ background: '#4C3A5A' }}
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>


                            <div className="flex-1 mx-4">
                                <div
                                    ref={progressRef}
                                    onClick={handleProgressClick}
                                    className="w-full rounded-sm relative cursor-pointer h-[3.5px] bg-[#32283a]"
                                >
                                    <div
                                        className="absolute left-0 top-0 h-full rounded-sm transition-all duration-100"
                                        style={{
                                            width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                                            background: '#4C3A5A'
                                        }}
                                    />
                                </div>
                            </div>

                            <span
                                className="font-mono text-lg sm:text-xl"
                                style={{
                                    color: 'rgba(255, 255, 255, 0.66)',
                                    lineHeight: '130.31%'
                                }}
                            >
                                {formatTime(currentTime)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayerCard;