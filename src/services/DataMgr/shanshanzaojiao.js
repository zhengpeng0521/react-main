import qs from 'qs';

export async function SearchModalOne(params) {
    console.log('service SearchModalOne',params);
    return serviceRequest(`${BASE_URL}/sstable/ssedu`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}





