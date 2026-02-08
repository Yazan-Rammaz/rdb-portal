import { useEffect, useRef } from 'react';
import API from '@/lib/api';
import { useLayout } from '@/context/LayoutContext';

interface SelectUserProps {
    disabled: boolean;
    handleSelectUser: () => void;
    token: any;
    entities: any;
    clients: any;
    setClients: (value: any) => void;
    setEntities: (value: any) => void;
}

const SelectUser = ({ disabled, entities, clients, setClients, setEntities, token, handleSelectUser }: SelectUserProps) => {
    const { user } = useLayout();
    const _getClients = (value: any) => {
        if (value) {
            if (value.includes(',')) {
                setClients((prev: any) => {
                    return {
                        ...prev,
                        selected: { name: value?.split(',')[0], trading_number: value?.split(',')[1] }
                    };
                });
                handleSelectUser();
            } else {
                setClients((prev: any) => {
                    return {
                        ...prev,
                        selected: {
                            name: value,
                            trading_number: null
                        }
                    };
                });
                handleSelectUser();
            }
            API.get(
                '/api/v1/clients',
                { search: value },
                (res) => {
                    if (res?.data) {
                        setClients((prev: any) => {
                            return {
                                ...prev,
                                open: true,
                                data: res?.data
                            };
                        });
                    }
                },
                (error) => {
                    console.error('GET Clients Error:', error);
                },
                { Authorization: 'Bearer ' + user?.access_token }
            );
        } else {
            setClients((prev: any) => {
                return {
                    ...prev,
                    selected: null,
                    open: false,
                    data: []
                };
            });
        }
    };

    const handleChangeClient = (value: any) => {
        const clientdiv = document.getElementById('clientdiv');
        if (value) {
            setClients((prev: any) => {
                return {
                    ...prev,
                    selected: value,
                    open: false
                };
            });
            handleSelectUser();
            if (clientdiv && clientdiv instanceof HTMLInputElement) {
                clientdiv.value = !value?.trading_number ? value.name : `${value.name} , ${value?.trading_number}`;
            }
        } else {
            setClients((prev: any) => {
                return {
                    ...prev,
                    data: [],
                    open: false
                };
            });
        }
    };
    const handleChangeEntity = (value: any) => {
        setEntities((prev: any) => {
            return {
                ...prev,
                selected: value
            };
        });
        handleSelectUser();
    };

    const _openEntities = () => {
        if (entities?.data?.length > 0 && !disabled) {
            setEntities((prev: any) => {
                return {
                    ...prev,
                    open: !prev?.open
                };
            });
        }
    };
    useEffect(() => {}, [entities]);

    const clientsRef = useRef<HTMLInputElement>(null);
    const entitiesRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (clientsRef.current && !clientsRef.current.contains(target)) {
                // setClients((prev: any) => {
                //     return {
                //         ...prev,
                //         open: false
                //     };
                // });
            }
            if (entitiesRef.current && !entitiesRef.current.contains(target)) {
                // setEntities((prev: any) => {
                //     return {
                //         ...prev,
                //         open: false
                //     };
                // });
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className=" h-[110px] w-[350px] flex mt-[40px] md:mt-0 text-[] flex-col items-center justify-between">
            <div
                className={`relative bg-[#F7F7F7]  ${
                    clients?.selected?.name && '!bg-[#fafafa]'
                } flex flex-row justify-between items-center rounded-[15px] w-full border border-[#DDDDDD]`}
            >
                <svg
                    id="Group_12030"
                    data-name="Group 12030"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className="mx-[12px]"
                >
                    <g id="Group_12029" data-name="Group 12029" transform="translate(2.105)">
                        <circle
                            id="Ellipse_329"
                            data-name="Ellipse 329"
                            cx="4.474"
                            cy="4.474"
                            r="4.474"
                            transform="translate(3.42)"
                            fill={clients?.selected?.name ? '#bbbbbb' : '#cdcdcd'}
                        />
                        <g id="Group_7855" data-name="Group 7855" transform="translate(0 10)">
                            <g id="Group_7854" data-name="Group 7854">
                                <path
                                    id="Path_19144"
                                    data-name="Path 19144"
                                    d="M8.947,5a7.9,7.9,0,0,0-7.895,7.895A2.105,2.105,0,0,0,3.158,15H14.737a2.105,2.105,0,0,0,2.105-2.105A7.9,7.9,0,0,0,8.947,5Z"
                                    transform="translate(-1.053 -5)"
                                    fill={clients?.selected?.name ? '#bbbbbb' : '#cdcdcd'}
                                />
                            </g>
                        </g>
                    </g>
                    <rect id="Rectangle_4644" data-name="Rectangle 4644" width="20" height="20" fill="none" />
                </svg>
                <input
                    ref={clientsRef}
                    disabled={disabled}
                    id="clientdiv"
                    defaultValue={clients?.selected?.name ? clients?.selected?.name + ',' + clients?.selected?.trading_number : ''}
                    onChange={(e) => _getClients(e.target.value)}
                    placeholder={'Costumer Name, Account Number'}
                    className={`w-full flex justify-center items-center text-center text-[#8E8E8E] placeholder:text-[#8E8E8E]  ${
                        clients?.selected?.name && '!bg-[#fafafa]'
                    } bg-[#F7F7F7] text-[14px] text-nowrap whitespace-nowrap overflow-hidden ${clients?.selected?.name ? 'family-reg' : 'family-light'}`}
                />
                <div className="m-w-[20px] m-[25px]"></div>
                {clients?.open && clients?.data?.length > 0 && (
                    <div className="!z-50 m-[-1px] no-scrollbar absolute flex flex-col w-[350px] max-h-[200px] left-0 top-[40px] bg-[#F7F7F7] border-b border-l border-r border-[#DDDDDD] rounded-b-[15px] overflow-y-scroll">
                        {clients?.data?.map((client: any, i: number) => {
                            return (
                                <div
                                    onClick={() => {
                                        handleChangeClient(client);
                                    }}
                                    key={i}
                                    className="z-50 flex flex-row items-center justify-center w-full min-h-[70px] border-b-[#CECDCD] border-b cursor-pointer hover:bg-[#E8E8E8]"
                                >
                                    <div className="w-full text-center text-[#8E8E8E] text-[14px] family-reg">
                                        {client.name} {client?.trading_number ? ` , ${client?.trading_number}` : ''}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div
                ref={entitiesRef}
                onClick={_openEntities}
                className={`relative ${token ? '' : 'cursor-pointer'} bg-[#F7F7F7] ${
                    entities?.selected?.name && !entities?.open && 'bg-[#fafafa]'
                } flex   flex-row justify-between text-[#8E8E8E] items-center rounded-[15px] w-full border border-[#DDDDDD]`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="15.001" height="15.852" viewBox="0 0 20.001 19.852" className="m-[15px]">
                    <g id="Group_12031" data-name="Group 12031" transform="translate(0 0)">
                        <path
                            id="Path_19352"
                            data-name="Path 19352"
                            d="M10.858,1.484,1.7.093A1.477,1.477,0,0,0,.517.418,1.49,1.49,0,0,0,0,1.534V19.093a.836.836,0,0,0,.833.833H3.542V15.551A1.455,1.455,0,0,1,5,14.092H7.083a1.455,1.455,0,0,1,1.458,1.458v4.375h3.542v-17a1.459,1.459,0,0,0-1.225-1.442ZM4.583,12.217H3.333a.625.625,0,0,1,0-1.25h1.25a.625.625,0,1,1,0,1.25Zm0-2.5H3.333a.625.625,0,0,1,0-1.25h1.25a.625.625,0,0,1,0,1.25Zm0-2.5H3.333a.625.625,0,0,1,0-1.25h1.25a.625.625,0,0,1,0,1.25Zm0-2.5H3.333a.625.625,0,0,1,0-1.25h1.25a.625.625,0,0,1,0,1.25Zm4.167,7.5H7.5a.625.625,0,0,1,0-1.25H8.75a.625.625,0,0,1,0,1.25Zm0-2.5H7.5a.625.625,0,0,1,0-1.25H8.75a.625.625,0,0,1,0,1.25Zm0-2.5H7.5a.625.625,0,0,1,0-1.25H8.75a.625.625,0,0,1,0,1.25Zm0-2.5H7.5a.625.625,0,0,1,0-1.25H8.75a.625.625,0,0,1,0,1.25Z"
                            transform="translate(0 -0.074)"
                            fill={entities?.selected?.name ? '#bbbbbb' : '#cdcdcd'}
                        />
                        <path
                            id="Path_19353"
                            data-name="Path 19353"
                            d="M12.392,5.139,6.458,3.9V16.1h5.625a1.46,1.46,0,0,0,1.458-1.458V6.564A1.451,1.451,0,0,0,12.392,5.139ZM10.417,13.6H9.167a.625.625,0,0,1,0-1.25h1.25a.625.625,0,1,1,0,1.25Zm0-2.5H9.167a.625.625,0,0,1,0-1.25h1.25a.625.625,0,1,1,0,1.25Zm0-2.5H9.167a.625.625,0,0,1,0-1.25h1.25a.625.625,0,0,1,0,1.25Z"
                            transform="translate(6.459 3.748)"
                            fill={entities?.selected?.name ? '#bbbbbb' : '#cdcdcd'}
                        />
                    </g>
                </svg>
                <div className="">
                    <div
                        className={`w-full flex justify-center items-center text-center !text-[#8E8E8E] bg-[#F7F7F7]  ${
                            entities?.selected?.name && 'bg-[#fafafa]'
                        } text-[14px] text-nowrap whitespace-nowrap overflow-hidden ${entities?.selected?.name ? 'family-reg' : 'family-light'}`}
                    >
                        {entities?.selected?.name || 'Entity'}
                    </div>
                    {entities?.open && (
                        <div className="!z-50 no-scrollbar absolute m-[-1px] flex flex-col w-[350px] max-h-[200px] left-0 top-[40px] bg-[#F7F7F7] border-b border-l border-r border-[#DDDDDD] rounded-b-[15px] overflow-y-scroll">
                            {entities?.data?.map((entity: any, i: number) => {
                                return (
                                    <div
                                        onClick={() => {
                                            handleChangeEntity(entity);
                                        }}
                                        key={i}
                                        className="z-50 flex flex-row items-center justify-center w-full min-h-[70px] border-b-[#CECDCD] border-b cursor-pointer hover:bg-[#E8E8E8]"
                                    >
                                        <div className="w-full text-center text-[#8E8E8E] text-[14px] family-reg">{entity.name}</div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="m-w-[20px] m-[15px]"></div>
            </div>
        </div>
    );
};

export default SelectUser;
