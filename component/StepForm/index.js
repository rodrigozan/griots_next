import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import StepForm01 from './StepForm01';
import StepForm02 from './StepForm02';
import StepForm03 from './StepForm03';
import StepForm04 from './StepForm04';
import StepForm05 from './StepForm05';
import StepForm06 from './StepForm06';
import StepForm07 from './StepForm07';

import { openai_request_list } from '@/utils/openai';

import subgenres_json from '@/json/subgenres.json';
import countrys_json from '@/json/countrys.json'
import genres_json from '@/json/genres.json'

const Step1 = ({ onNextStep }) => {
    const [selectedMythology, setSelectedMythology] = useState(null);
    const [assistant, setAssistant] = useState('');

    const handleChangeMythology = (e) => {
        const selected = e.value;
        setSelectedMythology(selected);

        if (selected.god_wisdom) {
            setAssistant(selected.god_wisdom);
            localStorage.setItem("assistant", selected.god_wisdom)
        } else {
            setAssistant('');
        }
    };
    return (
        <Card>
            <StepForm01
                selectedMythology={selectedMythology}
                handleChangeMythology={handleChangeMythology}
                onNextStep={onNextStep}
            />
        </Card>
    );
};

const Step2 = ({ onNextStep, onPreviousStep }) => {
    const [genre, setGenre] = useState('');
    const [genreSelected, setGenreSelected] = useState('');

    const assistant = localStorage.getItem("assistant")

    const handleChangeGenre = (e) => {
        let selected = e.target.value
        setGenreSelected(selected)
        console.log(selected)

        if (selected.genre) {
            console.log(selected.genre)
            setGenre(selected.genre);
            localStorage.setItem("genre", selected.genre)
        } else {
            setGenre('');
        }
    };

    return (
        <Card>
            <StepForm02
                assistant={assistant}
                genre={genreSelected}
                genresOptions={genres_json}
                handleChangeGenre={handleChangeGenre}
                onNextStep={onNextStep}
                onPreviousStep={onPreviousStep}
            />
        </Card>
    );
};

const Step3 = ({ onNextStep, onPreviousStep }) => {
    const [subGenres, setSubGenres] = useState([]);

    const storage = localStorage.getItem('genre')

    const filter = genres_json.filter(el => el.genre === localStorage.getItem('genre'));
    const genre = filter.map(el => el.label).join(', ');

    const subgenresOptions = subgenres_json[storage] || [];
    const subOptions = subgenresOptions.map(subgenre => ({ label: subgenre, value: subgenre }))
    const isSubgenreSelected = Array.isArray(subGenres) && subGenres.length > 0;

    const handleChangeSubgenre = (e) => {
        setSubGenres(e.target.value)
        localStorage.setItem("sugGenres", subGenres)
    };

    return (
        <Card>
            <p>Ótima escolha! Agora, qual subgênero de <strong className='text-primary'>{genre}</strong> você prefere?</p>
            {isSubgenreSelected ? (
                <div>
                    {/* Display subgenre information */}
                    <p>Selected Subgenre: {subGenres}</p>
                    <Button onClick={onNextStep} className="w-full">Next step</Button>
                    <Button severity="secondary" onClick={onPreviousStep} className="w-full mt-3 text-right">Previous step</Button>
                </div>
            ) : (
                <div>
                    <StepForm03
                        subGenres={subGenres}
                        genre={genre}
                        subOptions={subOptions}
                        onChange={handleChangeSubgenre}
                    />
                    <Button onClick={onNextStep} className="w-full">Next step</Button>
                    <Button severity="secondary" onClick={onPreviousStep} className="w-full mt-3 text-right">Previous step</Button>
                </div>
            )}
        </Card>
    );
};

const Step4 = ({ onNextStep, onPreviousStep }) => {
    const [mythology_folklore, setMythologyFolklore] = useState('');

    const handleChangeMythologyFolklore = (e) => {
        const selectedValue = (e.target.value);
        console.log(selectedValue);
        setMythologyFolklore(selectedValue);
    };

    return (
        <Card>
            <StepForm04
                mythology_folklore={mythology_folklore}
                handleChangeMythologyFolklore={handleChangeMythologyFolklore}
                onNextStep={onNextStep}
                onPreviousStep={onPreviousStep}
            />
        </Card>
    );
};

const Step5 = ({ onNextStep, onPreviousStep }) => {
    const [countrys, setCountrys] = useState([]);
    const [country_selected, setCountrySelected] = useState('')

    useEffect(() => {
        setCountrys(countrys_json);
    }, []);

    const handleChangeCountry = (e) => {
        console.log(e.value);
        setCountrySelected(e.value);
        localStorage.setItem("country", e.value)
    };

    return (
        <Card>
            <StepForm05
                country_selected={country_selected}
                countrys={countrys}
                handleChangeCountry={handleChangeCountry}
                onNextStep={onNextStep}
                onPreviousStep={onPreviousStep}
            />
        </Card>
    );
};

const Step6 = ({ onNextStep, onPreviousStep }) => {
    const [historicEvents, setHistoricEvents] = useState('');
    const [chosenEvent, setChosenEvent] = useState('');
    const [showInput, setShowInput] = useState(true);

    const handleChangeHistoricEvents = (e) => {
        const selectedValue = e.value;
        setHistoricEvents(selectedValue);
    };

    const setEvents = (event) => {
        const new_object = event.split('\\n');
        const new_array = {};

        for (let i = 0; i < new_object.length; i++) {
            const line = new_object[i];
            const colonIndex = line.indexOf(':');

            if (colonIndex !== -1) {
                const value = line.substring(colonIndex + 1).trim();

                if (line.startsWith("Título:")) {
                    new_array.titulo = value;
                } else if (line.startsWith("Data de Início:")) {
                    new_array.data_inicio = value;
                } else if (line.startsWith("Data final:")) {
                    new_array.data_final = value;
                } else if (line.startsWith("Protagonistas:")) {
                    new_array.protagonistas = value;
                } else if (line.startsWith("Resumo:")) {
                    new_array.resumo = value;
                    for (let j = i + 1; j < new_object.length; j++) {
                        const nextLine = new_object[j];
                        if (nextLine.endsWith('\"')) {
                            new_array.resumo += '\n' + nextLine;
                            i = j; // Skip lines that were already processed
                            break;
                        } else {
                            new_array.resumo += '\n' + nextLine;
                            i = j; // Skip lines that were already processed
                        }
                    }
                }
            }
        }

        console.log(new_array);
        setChosenEvent(new_array);
    };


    const handleChangeGenerateEvents = async () => {
        if (!localStorage.getItem("HistorycEvents")) {
            const country = localStorage.getItem("country")
            const prompt = `Liste para mim um evento histórico da cultura do/da ${country}, um evento aleatório. No evento, coloque o titulo do evento histórico, data de início, data final, principais protagonistas e um pequeno resumo do evento. Se explicação, ou introdução, apenas o evento.`
            const response_list = await openai_request_list(prompt, "HistorycEvents")

            setEvents(response_list)
        } else {
            console.log("Já tem eventos no histórico")
            const storage = localStorage.getItem("HistorycEvents")
            setEvents(storage)
        }

    };

    return (
        <Card>
            <p>Gostaria de adicionar um evento histórico para trabalhar na sua história?</p>
            {showInput && (
                <InputText
                    className='my-5 w-full'
                    value={historicEvents}
                    onChange={handleChangeHistoricEvents}
                    placeholder="Enter the historyc event"
                />
            )}
            <p>Ou, se preferir, posso escolher um evento histórico do país que você escolheu anteriormmente:</p>
            <Button onClick={handleChangeGenerateEvents} className="my-5 w-full">Gerar eventos</Button>
            {chosenEvent != "" && (
                <Card title={chosenEvent.titulo.replace(',', '')} className="my-5">
                    <p className="m-0">
                        <div>
                            <p>Ocorreu de {chosenEvent.data_inicio} a {chosenEvent.data_final}</p>
                            <p><strong>Protagonistas:</strong> {chosenEvent.protagonistas}</p>
                            <p><strong>Resumo:</strong> {chosenEvent.resumo.replace('"', '')}</p>
                        </div>
                        {/* {historicEvents} */}
                    </p>
                </Card>
            )}
            <Button onClick={onNextStep} className="w-full">Next step</Button>
            <Button severity="secondary" onClick={onPreviousStep} className="w-full mt-3 text-right">Previous step</Button>
        </Card>
    );
};




const Step7 = ({ onNextStep, onPreviousStep }) => {
    const [themeMessage, setThemeMessage] = useState('');
    const [chosenEvent, setChosenEvent] = useState([]);
    const [showInput, setShowInput] = useState(true);

    const setList = (theme_message) => {
        const list = theme_message.split('\\n')
        const new_array = list.slice(2, -1).map(line => line.replace(/^\d+\.\s*/, ''));
        console.log(new_array);
        setChosenEvent(new_array)

    }

    const handleGenerateListThemeMessage = async () => {
        if (!localStorage.getItem("ThemesAndMessages")) {
            const subGenres = localStorage.getItem("subGenres")
            const genre = localStorage.getItem("genre")
            // const prompt = `Me dê uma lista de 10 temas para eu escolher para uma história de ${subGenres} que estou planejando. No tema, coloque um tema e uma mensagem que possam ser trabalhadas em livros e contos do gênero ${genre}, no subgênero ${subGenres}`
            // const response_list = await openai_request_list(prompt, "ThemesAndMessages")

            // const new_object = response_list.split('\\n')  
            // setChosenEvent(new_object);
            // console.log(new_object)
        } else {
            console.log("Já tem tema e mensagem")
            const storage = localStorage.getItem("ThemesAndMessages")
            setList(storage)
            // setChosenEvent(storage);
        }
    };

    const handleChangeThemeMessage = (e) => {
        setThemeMessage(e.target.value);
    };

    return (
        <Card>
            <p>Gostaria de criar automaticamente o tema e a mensagem da história?</p>
            {showInput && (
                <InputText
                    className='my-5 w-full'
                    value={themeMessage}
                    onChange={handleChangeThemeMessage}
                    placeholder="Enter the theme and the message of your story"
                />
            )}
            <p>Ou, se preferir, posso criar uma lista de temas e mensagens para você escolher:</p>
            <Button onClick={handleGenerateListThemeMessage} className="my-5 w-full">Gerar Tema e Mensagem</Button>
            {chosenEvent && (<Dropdown value={themeMessage} onChange={handleChangeThemeMessage} options={chosenEvent.map((option, index) => ({ label: option, value: index }))} />)}
            <Button onClick={onNextStep} className="w-full">Next step</Button>
            <Button severity="secondary" onClick={onPreviousStep} className="w-full mt-3 text-right">Previous step</Button>
        </Card>
    );
};

const StepForm = {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
};

export default StepForm;
