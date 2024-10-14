import React from "react";
import ModalInputs from "./ModalInputs";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
    openForm: boolean;
    setOpenForm: (open: boolean) => void;
}

export default function Modal({ openForm, setOpenForm }: Props) {
    return (
        <div
            className="bg-black/40 backdrop-blur-lg flex justify-center items-center fixed top-0 left-0 w-full h-full"
            style={{ display: openForm ? "block" : "none" }}
        >
            <div className="bg-white max-w-[1000px] w-full p-4 shadow-xl rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div onClick={() => setOpenForm(false)} className="flex justify-between">
                    <h2 className="text-2xl">Projekt anlegen</h2>
                    <XMarkIcon className="w-6 h-6 cursor-pointer" />
                </div>
                <div className="my-3 flex flex-col space-y-3">
                    <ModalInputs
                        onChange={() => {}}
                        label_name="Projektname"
                        input_name="title"
                        placeholder="Projektname"
                        type="text"
                        required={true}
                    />
                    <button className="bg-primary hover:bg-hoverPrimary text-white font-bold py-2 px-4 rounded-xl">
                        Projekt erstellen
                    </button>
                </div>
            </div>
        </div>
    );
}
