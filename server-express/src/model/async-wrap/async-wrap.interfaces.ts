import { Request, Response } from 'express';

export type routeType = (req: Request, res: Response) => Promise<void>;
