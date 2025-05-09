import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import FetchRequest from "../fetchRequest";
import FilesTable from "./FilesTable";
import ImageTable from "./ImageTable";
import HardwareTable from "./HardwareTable";

const NodeViewPage = () => {
    const { id } = useParams()
    const [node, setNode] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeTab, setActiveTab] = useState(1)

    useEffect(() => {
        FetchRequest("GET", `/get_node/${id}`, null)
            .then(response => {
                if (response.success && response.data != null) {
                    setNode(response.data)
                    setIsLoaded(true)
                }
            })
    }, [id]);

    return (
        <section className="node-view">
            <div className="contain">
                {isLoaded &&
                    <div className="info">
                        <div className="column">
                            <div className="block">
                                <span>Наименование узла</span>
                                <p>{node.Name}</p>
                            </div>
                            <div className="block">
                                <span>Адрес узла</span>
                                <p>{`${node.Address.Street.Type.ShortName} ${node.Address.Street.Name}, ${node.Address.House.Type.ShortName} ${node.Address.House.Name}`}</p>
                            </div>
                            <div className="block">
                                <span>Тип узла</span>
                                <p>{node.Type.Name}</p>
                            </div>
                            <div className="block">
                                <span>Родительский узел</span>
                                {node.Parent != null ? <Link to={`/nodes/view/${node.Parent.ID}`}><p>{node.Parent.Name}</p></Link> : <p>-</p>}
                            </div>
                            <div className="block">
                                <span>Владелец узла</span>
                                <p>{node.Owner.Name}</p>
                            </div>
                            <div className="block">
                                <span>Район узла</span>
                                <p>{node.Zone.Valid ? node.Zone.String : "-"}</p>
                            </div>
                            <div className="block">
                                <span>Дата создания</span>
                                <p>{new Date(node.CreatedAt * 1000).toLocaleString().slice(0, 17)}</p>
                            </div>
                            <div className="block">
                                <span>Дата изменения</span>
                                <p>{node.UpdatedAt.Valid ? new Date(node.UpdatedAt.Int64 * 1000).toLocaleString().slice(0, 17) : "-"}</p>
                            </div>
                        </div>
                        <div className="column">
                            <div className="block textarea">
                                <span>Расположение узла</span>
                                <p>{node.Placement.String}</p>
                            </div>
                            <div className="block textarea">
                                <span>Питание узла</span>
                                <p>{node.Supply.String}</p>
                            </div>
                            <div className="block textarea">
                                <span>Доступ к узлу</span>
                                <p>{node.Access.String}</p>
                            </div>
                            <div className="block textarea">
                                <span>Описание узла</span>
                                <p>{node.Description.String}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="tabs-contain">
                <div className="tabs">
                    <div className={activeTab === 1 ? "tab active" : "tab"} onClick={() => setActiveTab(1)}>Изображения</div>
                    <div className={activeTab === 2 ? "tab active" : "tab"} onClick={() => setActiveTab(2)}>Файлы</div>
                    <div className={activeTab === 3 ? "tab active" : "tab"} onClick={() => setActiveTab(3)}>Оборудование</div>
                </div>
            </div>
            {activeTab === 1 && <ImageTable type="node"/>}
            {activeTab === 2 && <FilesTable type="node"/>}
            {activeTab === 3 && <HardwareTable type="node" id={Number(id)} canCreate={true}/>}
        </section>
    )
}

export default NodeViewPage