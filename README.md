## 중복 파일 찾기

파일 관리를 잘 안하기 때문에 특정 디렉토리의 경우 중복된 파일이 다수 존재 합니다.

이를 확인하는 단순한 로직을 작성하였습니다.

md5 hash를 이용해서 파일의 hash정보로 비교 하여 더 정확하게 중복된 파일을 확인합니다.

사용법 : node index.js ./검색디렉토리/검색파일형식

```
$> node index.js ./searchPath/**/*.txt
$> node index.js **/*
```

> 시작 디렉테로를 상위로 이동시키기 위해서는 ```../../``` (한 개만 사용하면 동작 안함)를 사용해야 한다.  

> LINUX에서는 상대 경로만 동작한다. (윈도우에서는 절대 경로도 잘 동작함)

