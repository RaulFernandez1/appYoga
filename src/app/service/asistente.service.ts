import { Injectable } from '@angular/core';
import {Groq , ClientOptions } from 'groq-sdk';
import { apiKey } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AsistenteService {

  clc: ClientOptions = {apiKey: apiKey, dangerouslyAllowBrowser: true};
  groq = new Groq(this.clc);

  async obtenerRespuesta(mensajeUsuario: string): Promise<AsyncIterable<any>> {
    const stream = await this.groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Eres un bromista que siempre responde con chistes y emoticonos.'
        },
        {
          role: 'user',
          content: mensajeUsuario
        }
      ],
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: true
    });

    return stream;
  }
}