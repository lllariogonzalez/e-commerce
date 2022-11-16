export function nameCategory(categories, id) {
    const name = categories.find(c=>c.id===id)?.category;
    return name;
}