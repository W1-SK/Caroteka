import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { authenticateToken } from '../middlewares/auth.middleware'; // <--- NÁŠ ZÁMEK

import { authSchema } from '../validations/auth.validation';
import { getMonstersSchema, createMonsterSchema } from '../validations/monster.validation';
import { getItemsSchema, createItemSchema } from '../validations/item.validation';
import { createClassSchema } from '../validations/class.validation';

import { register, login } from '../controllers/auth.controller';
import { getMonsters, createMonster, deleteMonster } from '../controllers/monster.controller';
import { getItems, createItem, deleteItem } from '../controllers/item.controller';
import { getClasses, createClass, deleteClass } from '../controllers/class.controller';
import { createSpellSchema, getSpellsSchema } from "../validations/spell.validation";
import { createSpell, deleteSpell, getSpellById, getSpells } from "../controllers/spell.controller";

const router = Router();

router.post('/auth/register', validate(authSchema), register);
router.post('/auth/login', validate(authSchema), login);

// MONSTERS
router.get('/monsters', validate(getMonstersSchema), getMonsters); 
router.post('/monsters', authenticateToken, validate(createMonsterSchema), createMonster); 
router.delete('/monsters/:id', authenticateToken, deleteMonster); 

// ITEMS
router.get('/items', validate(getItemsSchema), getItems); 
router.post('/items', authenticateToken, validate(createItemSchema), createItem); 
router.delete('/items/:id', authenticateToken, deleteItem); 

// CLASSES
router.get('/classes', getClasses); 
router.post('/classes', authenticateToken, validate(createClassSchema), createClass); 
router.delete('/classes/:id', authenticateToken, deleteClass); 

// SPELLS
router.get('/spells', validate(getSpellsSchema), getSpells); 
router.get('/spells/:id', getSpellById); 
router.post('/spells', authenticateToken, validate(createSpellSchema), createSpell); 
router.delete('/spells/:id', authenticateToken, deleteSpell); 

export default router;