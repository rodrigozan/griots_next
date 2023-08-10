import { useState, useEffect } from 'react';

import axios from 'axios';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton'

import Question from '@/component/Question';
import OptionChoice from '@/component/Choice';

import countrys_json from '@/json/countrys.json'


export default function HistoriaFantasia() {
    const [story, setStory] = useState('');
    const [step, setStep] = useState(0);
    const [assistant, setAssistant] = useState('')
    const [selectedMythology, setSelectedMythology] = useState(null);
    const [genre, setGenre] = useState('');
    const [subGenres, setSubGenres] = useState([]);
    const [mythologyFolklore, setMythologyFolklore] = useState('');
    const [specificMythology, setSpecificMythology] = useState('');
    const [country, setCountry] = useState([]);
    const [countrySelected, setCountrySelected] = useState('')
    const [historicEvents, setHistoricEvents] = useState('');
    const [listHistoricEvents, setListHistoricEvents] = useState('');
    const [lastStep, setLastStep] = useState(20);

    const nextStep = () => {
        setStep(step + 1);
        console.log(step)
    };

    const previousStep = () => {
        setStep(step - 1);
    };

    const mythologys = [
        {
            "mythology": "Tupi-Guarani",
            "god_wisdom": "Tupã"
        },
        {
            "mythology": "Grega",
            "god_wisdom": "Athena"
        },
        {
            "mythology": "Romana",
            "god_wisdom": "Minerva"
        },
        {
            "mythology": "Nórdica",
            "god_wisdom": "Odin"
        },
        {
            "mythology": "Egípcia",
            "god_wisdom": "Thoth"
        },
        {
            "mythology": "Iorubá",
            "god_wisdom": "Orunmila"
        },
        {
            "mythology": "Celta",
            "god_wisdom": "Ogma"
        },
        {
            "mythology": "Japonesa",
            "god_wisdom": "Tenjin"
        },
        {
            "mythology": "Chinesa",
            "god_wisdom": "Wenchang Wang"
        },
        {
            "mythology": "Coreana",
            "god_wisdom": "Chun-T'ian"
        },
        {
            "mythology": "Asteca",
            "god_wisdom": "Quetzalcóatl"
        },
        {
            "mythology": "Bantu",
            "god_wisdom": "Mbombo"
        }
    ]

    const handleChangeMythology = (e) => {
        const selected = e.value;
        setSelectedMythology(selected)

        if (selected.god_wisdom) {
            setAssistant(selected.god_wisdom);
        } else {
            setAssistant('');
        }
    };

    const handleChangeGenre = (e) => {
        setGenre(e.target.value);
    };

    const fantasySubgenres = [
        'High Fantasy',
        'Low Fantasy',
        'Urban Fantasy',
        'Historical Fantasy',
        'Epic Fantasy',
        'Sword and Sorcery',
        'Portal Fantasy',
        'Dark Fantasy',
        'Mythic Fantasy',
        'Magical Realism',
    ];

    const scienceFictionSubgenres = [
        'Space Opera',
        'Cyberpunk',
        'Post-Apocalyptic',
        'Hard Science Fiction',
        'Soft Science Fiction',
        'Time Travel',
        'Alternate History',
        'Dystopian',
        'Steampunk',
        'Military Science Fiction',
    ];

    const horrorSubgenres = [
        'Psychological Horror',
        'Supernatural Horror',
        'Slasher',
        'Creature Feature',
        'Gothic Horror',
        'Body Horror',
        'Haunted House',
        'Found Footage',
        'Folk Horror',
        'Zombie Apocalypse',
    ];


    const handleChangeSubgenre = (e) => {
        setSubGenres(e.target.value)
    };

    const genresOptions = [
        { label: 'Fantasy', value: 'fantasy' },
        { label: 'Science Fiction', value: 'science fiction' },
        { label: 'Horror', value: 'horror' },
    ];

    const subgenresOptions = genre === 'fantasy'
        ? fantasySubgenres.map((subgenre) => ({ label: subgenre, value: subgenre }))
        : genre === 'science fiction'
            ? scienceFictionSubgenres.map((subgenre) => ({ label: subgenre, value: subgenre }))
            : genre === 'horror'
                ? horrorSubgenres.map((subgenre) => ({ label: subgenre, value: subgenre }))
                : [];

    const handleChangeMythologyFolklore = (e) => {
        const selectedValue = (e.target.value);
        console.log(selectedValue);
        setMythologyFolklore(selectedValue);
    };

    const handleChangeculture = (e) => {
        const selectedValue = e.value;
        setCulture(selectedValue);
    };

    const handleChangeHistoricEvents = (e) => {
        const selectedValue = e.value;
        setHistoricEvents(selectedValue);
    };

    const handleChangeListHistoricEvents = (e) => {
        const selectedValue = e.value;
        const question = `Liste para mim dez eventos históricos da cultura do/da ${culture}, listados em ordem cronológica em forma de um json. Nesse json, coloque o titulo do histórico, data de início, duração, data final, principais protagonistas e um pequeno resumo do evento`
        const storage = openai_request_list(question)
        localStorage.setItem("Historyc Events", storage)
    };

    useEffect(() => {
        setCountry(countrys_json);
    }, []);

    const handleChangeCountry = (e) => {
        console.log(e.value);
        setCountrySelected(e.value);
    };

    const openai_request_list = async (prompt) => {
        try {
            const question = `Liste para mim`
            const response = await axios.post(
                'https://api.openai.com/v1/engines/davinci-codex/completions',
                {
                    prompt: prompt,
                    max_tokens: 1000,
                    n: 1,
                    stop: '\n',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
                    },
                }
            );

            setListHistoricEvents(response.data.choices[0].text);
        } catch (error) {
            console.error('Erro ao consultar a API da OpenAI:', error);
        }
    };

    const fetchStoryFromOpenAI = async () => {
        try {
            const prompt = `Você é ${assistent}, um assistente de criação de histórias de ${genre}. Você vai me ajudar a planejar e escrever uma história de ${subgenre}.`;

            const response = await axios.post(
                'https://api.openai.com/v1/engines/davinci-codex/completions',
                {
                    prompt: prompt,
                    max_tokens: 1000,
                    n: 1,
                    stop: '\n',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
                    },
                }
            );

            setStory(response.data.choices[0].text);
        } catch (error) {
            console.error('Erro ao consultar a API da OpenAI:', error);
        }
    };

    return (
        <main style={{ height: '100vh', width: '100%' }} className="planning flex align-items-center justify-content-center">
            <div className="grid grid-nogutter surface-0 text-800">
                {step === 0 && (
                    <div className="card">
                        <Card>
                            <p>Guiaremos você com a sabedoria ancestral para a criação de sua história fantástica.</p>
                            <p>Escolha um <strong className='text-primary'>Sabio</strong> para guiá-lo em sua jornada de <strong className='text-primary'>creator</strong>:</p>
                            <Dropdown
                                className='my-5'
                                value={selectedMythology}
                                onChange={handleChangeMythology}
                                options={mythologys}
                                optionLabel="mythology"
                                placeholder="Select a mythology for choose a guide"
                            />
                            <Button onClick={nextStep} className="w-full">Next step</Button>
                        </Card>
                    </div>
                )}

                {step === 1 && (
                    <div className="card">
                        <Card>
                            <p>Olá! Sou o <strong className='text-primary'>{assistant}</strong> um assistente místico de criação de histórias de literatura fantástica.</p>
                            <p>Vou te ajudar a planejar e escrever uma história. Que gênero de história você gostaria de construir?</p>
                            <Dropdown
                                className='my-5'
                                value={genre}
                                options={genresOptions}
                                onChange={handleChangeGenre}
                                placeholder="Select a genre"
                            />
                            <Button onClick={nextStep} className="w-full">Next step</Button>
                            <Button severity="secondary" onClick={previousStep} className="w-full mt-3 text-right">Previous step</Button>
                        </Card>
                    </div>
                )}


                {step === 2 && genre && (
                    <div className="card">
                        <Card>
                            <p>Ótima escolha! Agora, qual subgênero de <strong className='text-primary'>{genre}</strong> você prefere?</p>
                            <Dropdown
                                className='my-5'
                                value={subGenres}
                                options={subgenresOptions}
                                onChange={handleChangeSubgenre}
                                placeholder="Select a subgenre"
                            />
                            <Button onClick={nextStep} className="w-full">Next step</Button>
                            <Button severity="secondary" onClick={previousStep} className="w-full mt-3 text-right">Previous step</Button>
                        </Card>
                    </div>
                )}

                {step === 3 && subGenres && (
                    <div>
                        <Card>
                            <p>Gostaria de trabalhar com alguma mitologia ou folclore específico nessa história? Se sim, me diga, por favor:</p>
                            <InputText
                                className='my-5'
                                value={mythologyFolklore}
                                onChange={handleChangeMythologyFolklore}
                                placeholder="Enter the mythology or folklore"
                            />
                            <Button onClick={nextStep} className="w-full">Next step</Button>
                            <Button severity="secondary" onClick={previousStep} className="w-full mt-3 text-right">Previous step</Button>
                        </Card>
                    </div>
                )}

                {step === 4 && mythologyFolklore && (
                    <div>
                        <Card>
                            <p>Gostaria de trabalhar com a cultura específica de algum país nessa história?</p>
                            <Dropdown
                                className='my-5'
                                value={countrySelected}
                                options={country}
                                optionLabel="name"
                                optionValue="code"
                                onChange={handleChangeCountry}
                                placeholder="Selecione um país"
                            />
                            <Button onClick={nextStep} className="w-full">Next step</Button>
                            <Button severity="secondary" onClick={previousStep} className="w-full mt-3 text-right">Previous step</Button>
                        </Card>
                    </div>
                )}

                {step === 5 && countrySelected && (
                    <div>
                        <Card>
                            <p>Gostaria de incorporar eventos históricos na sua história? Se sim, você pode adicioná-los abaixo:</p>
                            <InputText
                                className='my-5'
                                value={historicEvents}
                                onChange={handleChangeHistoricEvents}
                                placeholder="Enter the Historic Events"
                            />
                            <p>Ou gostaria que eu listasse para você alguns eventos baseados no país escolhido?</p>
                            <RadioButton
                                className='my-5'
                                name="answer" value={historicEvents}
                                onChange={handleChangeListHistoricEvents} /> <span className=''>Sim, liste eventos com base no país escolhido: <strong className='text-primary'>{countrySelected}</strong></span>
                            <Button onClick={nextStep} className="w-full">Next step</Button>
                            <Button severity="secondary" onClick={previousStep} className="w-full mt-3 text-right">Previous step</Button>
                        </Card>
                    </div>
                )}


                {step === lastStep && (
                    <div className="card">
                        <Card>
                            {/* Exiba a história gerada pela API */}
                            <div>
                                <h2>Resultado da História:</h2>
                                <pre>{story}</pre>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </main>
    );
}
