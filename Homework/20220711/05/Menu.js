import { useState } from 'react';
import './css/menu.css';

const initState = (items) => {
    const menuItems = [];
    for (let i = 0, k = items.length; i < k; i++) {
        menuItems.push({
            id: i + 1,
            name: items[i],
            active: false,
        });
    }
    return menuItems;
}

function Menu() {
    const items = ['首頁', '關於我們', '產品'];

    const defaultMenuItems = initState(items);

    const [menuItems, setMenuItems] = useState(defaultMenuItems);

    return (
        <ul>
            {menuItems.map((value, i) => {
                return (
                    <li
                        key={i}
                        onClick={() => {
                            const newMenuItems = defaultMenuItems.map(
                                (value, index) => {
                                    if (i === index) {
                                        return { ...value, active: true };
                                    }
                                    return value;
                                }
                            );

                            setMenuItems(newMenuItems);
                        }}
                    >
                        <a href="#/" className={value.active ? 'active' : ''}>
                            {value.name}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}

export default Menu;
