import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { SCHEMES, WORKOUTS } from '../utils/swoldier';
import Button from './Button';

function Header(props) {
    const { title, index, description } = props;
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-2'>
                <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400 p-4'>{index}</p>
                <h4 className='justify-center text-xl sm:text-2xl md:text-3xl'>{title}</h4>
            </div>
            <p className='text-sm sm:text-base mx-auto'>{description}</p>
        </div>
    );
}

function Generator({ muscles, setMuscles, poison, setPoison, goal, setGoal, updateWorkout  }) {
    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }

    function updateMuscles(muscleGroup) {
        if (muscles.includes(muscleGroup)) {
            setMuscles(muscles.filter(val => val !== muscleGroup));
            return;
        }

        if (muscles.length > 2) {
            return;
        }

        if (poison !== 'individual') {
            setMuscles([muscleGroup]);
            setShowModal(false);
            return;
        }

        setMuscles([...muscles, muscleGroup]);
        if (muscles.length === 2) {
            setShowModal(false);
        }
    }

    return (
        <SectionWrapper id={'generate'} header={"Generate Your Workout"} title={["It's", "Huge", "O'clock"]}> 
            <Header index={'01'} title={'Pick Your Poison'} description={'Select your workout'} />
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 p-4'>
                {Object.keys(WORKOUTS).map((type, typeIndex) => (
                    <button onClick={() => {
                        setMuscles([]);
                        setPoison(type);
                    }} className={'bg-slate-950 border  duration-200 px-4 hover:border-blue-600 py-3 rounded-lg ' + (type === poison ? ' border-blue-600' : ' border-blue-400')} key={typeIndex}>
                        <p className='capitalize'>{type.replaceAll('_', " ")}</p>
                    </button>
                ))}
            </div>
            <Header index={'02'} title={'Lock on Targets'} description={'Select your muscles for annihilation'} />
            <div className='bg-slate-950 border border-blue-400 py-3 rounded-lg flex flex-col'>
                <button onClick={toggleModal} className='relative flex items-center justify-center'>
                    <p className='capitalize'>{muscles.length === 0 ? 'Select Muscle Groups' : muscles.join(' ')}</p>
                    <i className="fa-solid fa-caret-down right-3 top-1/2 absolute -translate-y-1/2"></i>
                </button>
                {showModal && (
                    <div className='flex flex-col gap-2'> {/* Add spacing here */}
                        {poison === 'individual'
                            ? WORKOUTS[poison].map((muscleGroup, muscleGroupIndex) => (
                                <button 
                                    key={muscleGroupIndex}
                                    className={`duration-200 hover:border-blue-600 ${muscles.includes(muscleGroup) ? 'text-blue-400' : ''}`} 
                                    onClick={() => updateMuscles(muscleGroup)}
                                >
                                    <p>{muscleGroup}</p>
                                </button>
                              ))
                            : Object.keys(WORKOUTS[poison]).map((muscleGroup, muscleGroupIndex) => (
                                <button 
                                    key={muscleGroupIndex}
                                    className={`duration-200 hover:border-blue-600 ${muscles.includes(muscleGroup) ? 'text-blue-400' : ''}`} 
                                    onClick={() => updateMuscles(muscleGroup)}
                                >
                                    <p>{muscleGroup}</p>
                                </button>
                              ))
                        }
                    </div>
                )}
            </div>

            <Header index={'03'} title={'Become Juggernaut'} description={'Select your ultimate objective.'} />
            <div className='grid sm:grid-cols-3 grid-cols-1 sm:grid-cols-3 gap-4 p-4'>
                {Object.keys(SCHEMES).map((scheme, schemeIndex) => (
                    <button 
                        onClick={() => setGoal(scheme)}
                        className={`duration-200 hover:border-blue-600 bg-slate-950 border py-3 rounded-lg ${scheme === goal ? 'border-blue-600' : 'border-blue-400'}`}
                        key={schemeIndex}
                    >
                        <p className='capitalize'>{scheme.replace('_', ' ')}</p>
                    </button>
                ))}
            </div>
            <Button func={updateWorkout} className='mx-auto mb-30' text={"Formulate"} />
        </SectionWrapper>
    );
}

export default Generator;
