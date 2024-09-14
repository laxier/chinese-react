const {useState, useRef} = React;

const LexicalSubstitutionExercise = ({exercises, audioRef}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const convertTimeToSeconds = (time) => {
        const [minutes, seconds] = time.split('.').map(Number);
        return (minutes || 0) * 60 + (seconds || 0);
    };

    const playAudioAtTime = (time) => {
        const seconds = convertTimeToSeconds(time);
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.currentTime = seconds;
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < exercises.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const currentExercise = exercises[currentIndex];

    return (
        <div>
            <div className="navigation-controls">
                <button onClick={handlePrevious} disabled={currentIndex === 0}>
                    Previous
                </button>
                <span>Task {currentIndex + 1} of {exercises.length}</span>
                <button onClick={handleNext} disabled={currentIndex === exercises.length - 1}>
                    Next
                </button>
            </div>
            <div key={currentIndex} className="exercise-container">
                <div className="chinese-dialogue">
                    <div className="button-container">
                        <button onClick={() => playAudioAtTime(currentExercise.time)} className="play-audio-button">
                            Play
                        </button>
                    </div>
                    {currentExercise.dialogue.map((dialogue, dialogueIndex) => (
                        <p key={dialogueIndex} className="dialogue-line"> - {dialogue}</p>
                    ))}
                </div>

                {currentExercise.options && currentExercise.options.length > 0 && (
                    <div className="options-grid">
                        {currentExercise.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="option-item">
                                <button onClick={() => playAudioAtTime(option.time)} className="play-audio-button">
                                    Play audio
                                </button>
                                {option.words.map((option_i, wordIndex) => (
                                    <span key={wordIndex}>{option_i}</span>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const App = () => {
    const audioRef = React.useRef(null);

    return (
        <div className="material">
            <h2>3. Lexical Exercises</h2>
            <audio ref={audioRef} controls>
                <source src="L31_3_Lexical_exercises.mp3" type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
            <LexicalSubstitutionExercise exercises={exercisesData} audioRef={audioRef}/>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('lexical-substitution-exercise-container'));