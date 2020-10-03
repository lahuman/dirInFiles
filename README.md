## 중복 파일 찾기

파일 관리를 잘 안하기 때문에 특정 디렉토리의 경우 중복된 파일이 다수 존재 합니다.

이를 확인하는 단순한 로직을 작성하였습니다.

md5 hash를 이용해서 파일의 hash정보로 비교 하여 더 정확하게 중복된 파일을 확인합니다.

> 작은 파일들을 처리할때는 문제가 없었지만, 대용량(1G 이상) 파일을 비교시 너무 많은 시간이 소요 되었습니다.
이를 초기 0.1MB buffer를 읽어서 md5 hash로 변환하여 비교 하도록 처리 하니 성능이 많이 개선되었습니다.

사용법 : node index.js ./검색디렉토리/검색파일형식

```
$> node index.js ./searchPath/**/*.txt
$> node index.js **/*
```

> 시작 디렉테로를 상위로 이동시키기 위해서는 ```../../``` (한 개만 사용하면 동작 안함)를 사용해야 한다.  

> LINUX에서는 상대 경로만 동작한다. (윈도우에서는 절대 경로도 잘 동작함)

## 주요 기능 : 

- md5 hash 파일 처리는 청크(Chunk) 사이즈 처리를 해서 성능을 개선한다.
  - 초기 100000byte (0.1MB) 만 로드 하여 hash 처리 후 비교 한다.

```
// liteMd5는 0.1MB만 md5 hash로 변환한다.
const FIRST_SIZE = 100000;
const liteMd5 = (filePath) => {
  const res = fs.openSync(filePath, 'r');
  let buffer = Buffer.alloc(FIRST_SIZE);
  fs.readSync(res, buffer, 0, FIRST_SIZE, 0,);
  return md5(buffer);
}
```
