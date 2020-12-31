export class CognifitSdkResponse {

  params: object;

  constructor(url: string) {
    this.params = this.urlStringToJSON(url);
  }

  getResponseParams(): object {
    return this.params;
  }

  private urlStringToJSON(url: string): object {
    if(!url){
      return {};
    }
    const queryStringStarting = url.indexOf('?');
    if(queryStringStarting === -1){
      return {};
    }
    return this.queryStringToJSON(url.substr(url.indexOf('?')+1));
  };

  private queryStringToJSON(qs: string){
    const pairs = qs.split('&');
    const result: any = {};
    pairs.forEach((p) => {
      const pair = p.split('=');

      let key = pair[0];
      if(key.indexOf('[]') !== -1){
        key = key.replace('[]', '');
      }

      let value: number | string = decodeURIComponent(pair[1] || '');
      if(!isNaN(Number(value))){
        value = Number(value);
      }
      if( result[key] ) {
        if( Object.prototype.toString.call( result[key] ) === '[object Array]' ) {
          result[key].push( value );
        } else {
          result[key] = [ result[key], value ];
        }
      } else {
        result[key] = value;
      }
    });

    return JSON.parse(JSON.stringify(result));
  }

}
