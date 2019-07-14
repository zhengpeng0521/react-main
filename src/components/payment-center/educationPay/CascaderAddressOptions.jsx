let provinces = require('./addr/province.json');
let cities = require('./addr/cities.json');
let areas = require('./addr/district.json');
areas.forEach((area) => {
    const matchCity = cities.filter(city => city.code === area.parent)[0];
    if (matchCity) {
        matchCity.children = matchCity.children || [];
        matchCity.children.push({
            label: area.name,
            value: area.code,
        });
    }
});

cities.forEach((city) => {
    const matchProvince = provinces.filter(province => province.code === city.parent)[0];
    if (matchProvince) {
        matchProvince.children = matchProvince.children || [];
        matchProvince.children.push({
            label: city.name,
            value: city.code,
            children: city.children,
        });
    }
});

const options = provinces.map(province => ({
        label: province.name,
        value: province.code,
        children: province.children,
}));

export default options;
